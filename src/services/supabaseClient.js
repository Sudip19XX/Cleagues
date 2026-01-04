
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vmmfhagdsvogvsztbwoc.supabase.co';
const supabaseKey = 'sb_publishable_KMiaJzIm_88Y02PxZLluZA_wNN0_Rrk';

export const supabase = createClient(supabaseUrl, supabaseKey);
