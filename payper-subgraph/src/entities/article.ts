import { PostedArticle } from "../../generated/Contract/Contract";
import { Article } from "../../generated/schema";
import { BIG_INT_NEG_ONE, BIG_INT_ZERO, BYTES_EMPTY } from "../lib/constants";
import { BigInt, Bytes } from "@graphprotocol/graph-ts";


export function createArticle(event: PostedArticle): Article {
  let id = event.params.id.toString()

    let article = new Article(id);
    article.journalist = event.params.journalist;
    article.name = event.params.name;
    article.freeContent = event.params.freeContent;
    article.encryptedUrl = event.params.url;
    article.totalRating = BIG_INT_ZERO;
    article.amountOfRatings = BIG_INT_ZERO;
    article.price = event.params.price;
    article.totalPaymentReceived = BIG_INT_ZERO;
    article.date = event.params.date;
    article.imageUrl = event.params.imageUrl;
    article.videoUrl = event.params.videoUrl;
    article.newsType = event.params.newsType;
  

  return article as Article;
}

export function getArticle(id: string): Article {
    let article = Article.load(id);

  if (article == null) {
    article = new Article(id);
    article.journalist = BYTES_EMPTY
    article.name = "";
    article.freeContent = "";
    article.encryptedUrl = "";
    article.totalRating = BIG_INT_ZERO;
    article.amountOfRatings = BIG_INT_ZERO;
    article.price = BIG_INT_ZERO;
    article.totalPaymentReceived = BIG_INT_ZERO;
    article.date = BIG_INT_ZERO;
    article.imageUrl = "";
    article.videoUrl = "";
    article.newsType = BIG_INT_ZERO;
  }

  return article as Article;

}