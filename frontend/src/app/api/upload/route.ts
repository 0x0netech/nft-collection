import { NextResponse } from "next/server";
import { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

const pinataBaseUrl = "https://api.pinata.cloud";

export async function POST(req: any, res: NextApiResponse) {
  try {
    const formData = await req.formData();
    const file = formData.getAll("file")[0];

    const fileUrl = await uploadFileToIPFS(file);

    const metadata = {
      name: formData.get("name"),
      description: formData.get("description"),
      image: fileUrl,
    };

    const metadaUrl = await uploadJsonToIPFS(metadata);

    return NextResponse.json({ status: "success", data: metadaUrl });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ status: "fail", data: e });
  }
}

async function uploadFileToIPFS(file: any) {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(`${pinataBaseUrl}/pinning/pinFileToIPFS`, {
      headers: {
        Authorization: `Bearer ${process.env.PINATA_API_KEY}`,
      },
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to pin file to IPFS: ${response.statusText}`);
    }

    const data: { IpfsHash: string } = await response.json();

    const url = `https://ipfs.io/ipfs/${data.IpfsHash}`;
    return url;
  } catch (error) {
    console.log(error);
  }
}

async function uploadJsonToIPFS(json: any) {
  try {
    const response = await axios.post(
      `${pinataBaseUrl}/pinning/pinJSONToIPFS`,
      json,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.PINATA_API_KEY}`,
        },
      }
    );

    if (!response.data) {
      throw new Error(`Failed to pin file to IPFS: ${response.statusText}`);
    }

    const data: { IpfsHash: string } = await response.data;
    const url = `https://ipfs.io/ipfs/${data?.IpfsHash}`;

    return url;
  } catch (error) {
    console.log(error);
  }
}
