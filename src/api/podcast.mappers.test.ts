import { mapTop100Podcasts } from "./podcast.mappers";
import { PodcastListDto } from "./podcast.types";

describe("Podcast top 100 list mapper", () => {
  it("maps the api result to a more comfortable interface", () => {
    const expectedId = "Podcast id";
    const expectedName = "Podcast name";
    const expectedImage = "Podcast image";
    const expectedAuthor = "Podcast author";

    const apiResult: PodcastListDto = {
      feed: {
        author: {
          name: { label: "iTunes Store" },
          uri: { label: "http://www.apple.com/itunes/" },
        },
        entry: [
          {
            "im:name": { label: expectedName },
            "im:image": [
              {
                label:
                  "https://is1-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/55x55bb.png",
                attributes: { height: 55 },
              },
              {
                label: expectedImage,
                attributes: { height: 60 },
              },
              {
                label:
                  "https://is1-ssl.mzstatic.com/image/thumb/Podcasts113/v4/f2/21/fa/f221fabd-017f-5125-633b-f1fe4f39802a/mza_182995249085044287.jpg/170x170bb.png",
                attributes: { height: 170 },
              },
            ],
            summary: { label: "summary" },
            "im:price": {
              label: "Get",
              attributes: { amount: 0, currency: "USD" },
            },
            "im:contentType": {
              attributes: { term: "Podcast", label: "Podcast" },
            },
            rights: { label: "© All rights reserved" },
            title: { label: "Podcast title" },
            link: {
              attributes: {
                rel: "alternate",
                type: "text/html",
                href: "https://podcasts.apple.com/us/podcast/the-joe-budden-podcast/id1535809341?uo=2",
              },
            },
            id: {
              label:
                "https://podcasts.apple.com/us/podcast/the-joe-budden-podcast/id1535809341?uo=2",
              attributes: { "im:id": expectedId },
            },
            "im:artist": {
              label: expectedAuthor,
              attributes: {
                href: "https://podcasts.apple.com/us/artist/the-joe-budden-network/1535844019?uo=2",
              },
            },
            category: {
              attributes: {
                "im:id": "1310",
                term: "Music",
                scheme:
                  "https://podcasts.apple.com/us/genre/podcasts-music/id1310?uo=2",
                label: "Music",
              },
            },
            "im:releaseDate": {
              label: "2024-04-17T00:00:00-07:00",
              attributes: { label: "April 17, 2024" },
            },
          },
        ],
      },
    };

    const listItem = mapTop100Podcasts(apiResult);

    expect(listItem[0].id).toEqual(expectedId);
    expect(listItem[0].name).toEqual(expectedName);
    expect(listItem[0].author).toEqual(expectedAuthor);
    expect(listItem[0].image).toEqual(expectedImage);
  });
});
