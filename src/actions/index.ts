'use server'


type APIError = {
  error: string
}

type APISuccess = {
  url:{url: string},
  text:string
}

export const convertSpeech = async ({ message }: { message: string }) => {
  try {
   

    if (message.trim().split(/\s+/).length > 35) {
      return {
        error:
          "Due to a current Cloudflare limit, we can only scan texts up to 35 words. I'm working on removing this limit.",
      }
    }

    const res = await fetch('https://verbavo.raavinarayana212.workers.dev', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url:message,lang:"hi" }),
    })

  

    const json = await res.json()

    if (!res.ok) {
      const { error } = json as APIError
      return { error }
    }

    return json as APISuccess
  } catch (err) {
    return { error: 'Something went wrong, please try again.' }
  }
}