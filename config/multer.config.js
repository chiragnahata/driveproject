const multer = require("multer");
const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");


const config = JSON.parse(fs.readFileSync("supabase-admin-sdk.json", "utf8"));

const supabase = createClient(config.api_url, config.service_role_key);

const storage = multer.memoryStorage();
const upload = multer({ storage });

module.exports = { upload, supabase };
