'use server'

type APIError = {
  error: string
}

type APISuccess = {
  url: { url: string },
  text: string
}

export const convertSpeech = async ({ message }: { message: Blob | null }) => {
  try {

    console.log(message)

    if (!message) {
      return;
    }

    const formData = new FormData();
    const mp3File = new File([message], "audio.mp3", { type: "audio/mp3" });
    formData.append("file", mp3File, "audio.mp3");
    const responsetranslateaudio = await fetch("https://translatethechat.vercel.app/api/upload", {
      method: "POST",
      body: formData,
    });


    const audioUrl = await responsetranslateaudio.json();






    const res = await fetch('https://verbavo.raavinarayana212.workers.dev/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: audioUrl, lang: "hi" }),
    })



    const json = await res.json()

    console.log(json)

    if (!res.ok) {
      const { error } = json as APIError
      return { error }
    }

    return json as APISuccess
  } catch (err) {
    return { error: 'Something went wrong, please try again.' }
  }
}