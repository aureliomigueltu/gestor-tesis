import { getSupabaseClient, isSupabaseConfigured } from '../lib/supabase';
import { 
  ThesisChapter, 
  ResearchProfile, 
  ConsistencyMatrixRow, 
  AdvisorObservation, 
  ThesisTask, 
  BibliographicSource 
} from '../types/thesis';

export const THESIS_PROJECT_ID = 'tesis_aurelio_tacuri_2026';

export interface FullThesisPayload {
  research: ResearchProfile;
  chapters: ThesisChapter[];
  consistencyRows: ConsistencyMatrixRow[];
  observations: AdvisorObservation[];
  tasks: ThesisTask[];
  sources: BibliographicSource[];
}

export const SUPABASE_SETUP_SQL = `-- 1. Crea la tabla del proyecto de tesis (almacena el estado sincronizado en tiempo real)
create table if not exists public.thesis_project (
  id text primary key,
  research_profile jsonb not null,
  chapters jsonb not null,
  consistency_matrix jsonb not null,
  observations jsonb not null,
  tasks jsonb not null,
  sources jsonb not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_by text
);

-- 2. Habilita Row Level Security (RLS) y permite lectura y escritura con la clave anónima (anon key)
alter table public.thesis_project enable row level security;

create policy "Permitir lectura y escritura publica anonima"
  on public.thesis_project
  for all
  using (true)
  with check (true);

-- 3. Habilita la réplica en tiempo real (Realtime) para avisar al celular y a la PC al instante
alter publication supabase_realtime add table public.thesis_project;
`;

/**
 * Carga los datos de la tesis desde Supabase
 */
export async function loadThesisFromSupabase(projectId: string = THESIS_PROJECT_ID): Promise<{
  payload: FullThesisPayload | null;
  updatedAt?: string;
  updatedBy?: string;
  error?: string;
}> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return { payload: null, error: 'Supabase no está configurado aún.' };
  }

  try {
    const { data, error } = await supabase
      .from('thesis_project')
      .select('*')
      .eq('id', projectId)
      .maybeSingle();

    if (error) {
      console.warn('Error fetching from Supabase thesis_project:', error);
      return { payload: null, error: error.message };
    }

    if (!data) {
      return { payload: null };
    }

    return {
      payload: {
        research: data.research_profile,
        chapters: data.chapters,
        consistencyRows: data.consistency_matrix,
        observations: data.observations,
        tasks: data.tasks,
        sources: data.sources,
      },
      updatedAt: data.updated_at,
      updatedBy: data.updated_by,
    };
  } catch (err: any) {
    console.error('Exception loading from Supabase:', err);
    return { payload: null, error: err.message || 'Error de conexión con Supabase' };
  }
}

/**
 * Guarda o actualiza el estado completo de la tesis en Supabase
 */
export async function saveThesisToSupabase(
  payload: FullThesisPayload,
  userName: string,
  projectId: string = THESIS_PROJECT_ID
): Promise<{ success: boolean; error?: string }> {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return { success: false, error: 'Supabase no configurado' };
  }

  try {
    const row = {
      id: projectId,
      research_profile: payload.research,
      chapters: payload.chapters,
      consistency_matrix: payload.consistencyRows,
      observations: payload.observations,
      tasks: payload.tasks,
      sources: payload.sources,
      updated_at: new Date().toISOString(),
      updated_by: userName,
    };

    const { error } = await supabase
      .from('thesis_project')
      .upsert(row, { onConflict: 'id' });

    if (error) {
      console.error('Error saving to Supabase:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: any) {
    console.error('Exception saving to Supabase:', err);
    return { success: false, error: err.message || 'Error de conexión' };
  }
}

/**
 * Se suscribe a cambios en tiempo real desde Supabase para actualizar la UI en vivo
 */
export function subscribeToThesisRealtime(
  onRemoteUpdate: (payload: FullThesisPayload, updatedBy: string, updatedAt: string) => void,
  projectId: string = THESIS_PROJECT_ID
): () => void {
  const supabase = getSupabaseClient();
  if (!supabase) {
    return () => {};
  }

  const channel = supabase
    .channel(`thesis_channel_${projectId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'thesis_project',
        filter: `id=eq.${projectId}`,
      },
      (payload) => {
        if (payload.new && typeof payload.new === 'object') {
          const newRecord = payload.new as any;
          if (newRecord.chapters && newRecord.research_profile) {
            onRemoteUpdate(
              {
                research: newRecord.research_profile,
                chapters: newRecord.chapters,
                consistencyRows: newRecord.consistency_matrix || [],
                observations: newRecord.observations || [],
                tasks: newRecord.tasks || [],
                sources: newRecord.sources || [],
              },
              newRecord.updated_by || 'Usuario remoto',
              newRecord.updated_at || new Date().toISOString()
            );
          }
        }
      }
    )
    .subscribe((status) => {
      console.log('Supabase realtime status:', status);
    });

  return () => {
    supabase.removeChannel(channel);
  };
}
