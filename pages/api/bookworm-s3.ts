import axios from "axios";
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  videoCount: string;
  lastScraped: string;
};

const findTextAndReturnRemainder = (target: string, variable: string) => {
  var chopFront = target.substring(
    target.search(variable) + variable.length,
    target.length
  );
  var result = chopFront.substring(0, chopFront.search(";"));
  return result;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { data } = await axios.get(
    "https://www.youtube.com/playlist?list=PLwLSw1_eDZl1pGYxuxFAg3A4Y5rDCugXg"
  );

  const findAndClean = findTextAndReturnRemainder(data, "var ytInitialData =");
  const html = JSON.parse(findAndClean);
  const videoCount =
    html.contents.twoColumnBrowseResultsRenderer.tabs[0].tabRenderer.content
      .sectionListRenderer.contents[0].itemSectionRenderer.contents[0]
      .playlistVideoListRenderer.contents.length;

  const lastScraped = new Date().toLocaleString();

  res.status(200).json({ videoCount, lastScraped });
}
