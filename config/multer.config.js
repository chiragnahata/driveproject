const multer = require("multer");
const { createClient } = require("@supabase/supabase-js");

// Use environment variables instead of reading a JSON file
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = { upload, supabase };
