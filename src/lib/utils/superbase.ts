import { createClient } from '@supabase/supabase-js';
import { env } from '$env/dynamic/public';

const superbaseUrl = env.PUBLIC_SUPERBASE_URL

const superbaseAnonKey = env.PUBLIC_SUPERBASE_ANON_KEY

const superbase = createClient(superbaseUrl as string, superbaseAnonKey as string);

export default superbase