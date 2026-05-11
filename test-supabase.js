import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://oueaamkkjpwovzrfgstz.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im91ZWFhbWtranB3b3Z6cmZnc3R6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTczMjA3NjYsImV4cCI6MjA3Mjg5Njc2Nn0.0DuRU4SOhmpgHOCyzJcKoCUlTXmSxASU0sMfA-Q6kME-QNi3r8';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function test() {
  const { data, error } = await supabase.from('organisms').select('*').limit(1);
  console.log('Data:', data);
  console.log('Error:', error);
}

test();
