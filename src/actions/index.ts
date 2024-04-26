"use server"

import { put } from "@vercel/blob";


export const blobToUrl = async (message: Blob) => {
  try {
    const formData = new FormData();
    const filename = "file.mp3";
    const mp3File = new File([message], "audio.mp3", { type: "audio/mp3" });
    formData.append("file", mp3File, "audio.mp3");

    const contentType = "audio/mp3";
    const fileType = `.${contentType.split("/")[1]}`;

    // construct final filename based on content-type if not provided
    const finalName = filename.includes(fileType)
      ? filename
      : `${filename}${fileType}`;

    const blob = await put(finalName, mp3File, {
      contentType,
      access: "public",

    });
    console.log(blob.contentDisposition)
    return blob.url


  } catch (error) {

  }

}