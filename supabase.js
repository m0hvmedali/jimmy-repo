
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tiffpeuaxxxqjvuxgwnk.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRpZmZwZXVheHh4cWp2dXhnd25rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMyOTExOTUsImV4cCI6MjA2ODg2NzE5NX0._LztO2j22p1Kr5ZBMZLInVq2LU5CKDeFq05EehVd4uE'

  export const supabase = createClient(supabaseUrl, supabaseKey)
