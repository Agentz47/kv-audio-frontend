import { createClient } from "@supabase/supabase-js"

const anon_key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5bnlpbGJ0cmx3d2t3Y213bnloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTE5MTIxMzEsImV4cCI6MjA2NzQ4ODEzMX0.mNEN2E2wyGx5S2gCgQGEwhgRMjd3AvsVYmm11l1LCD0"
const supabase_url = "https://cynyilbtrlwwkwcmwnyh.supabase.co"
const supabase = createClient(supabase_url, anon_key)

export default function mediaUpload(file) {

    return new Promise((resolve, reject) => {
        if(file == null){
            reject("No file selected")
        }

        const timestamp = new Date().getTime();
        const fileName = timestamp + file.name

        supabase.storage.from("images").upload(fileName, file, {
            cacheControl: '3600',
            upset: false,

        }).then(() => {
            const publicUrl = supabase.storage.from("images").getPublicUrl(fileName).data.publicUrl;
            resolve(publicUrl)
        }).catch(()=>{
            reject("Error uploading file")
        })
    });


}