import { store } from "@graphprotocol/graph-ts"
import {
  Contract,
  ArticlePurchased,
  ArticleRated,
  CreatedEdition,
  CreatedJournalist,
  JounralistTipped,
  JournalistRated,
  PostedArticle,
  ArticleDeleted
} from "../../generated/Contract/Contract"
import { } from "../../generated/schema"
import { createEdition } from "../entities/edition"
import { createJournalist, getJournalist } from "../entities/journalist";
import { createArticle, getArticle } from "../entities/article";
import { BIG_INT_ONE } from "../lib/constants";
import { createPurchase } from "../entities/purchases";

export function handleArticlePurchased(event: ArticlePurchased): void {
  const article = getArticle(event.params.articleId.toString());
  article.totalPaymentReceived = article.totalPaymentReceived.plus(event.params.paidAmount);

  article.save()
  
  const purchase = createPurchase(event);
  purchase.save()
}

export function handleArticleRated(event: ArticleRated): void {
  const article = getArticle(event.params.articleId.toString());
  article.amountOfRatings = article.amountOfRatings.plus(BIG_INT_ONE);
  article.totalRating = article.totalRating.plus(event.params.rating);

  article.save()
}

export function handleCreatedEdition(event: CreatedEdition): void {
  const edition = createEdition(event);
  edition.save();
}

export function handleCreatedJournalist(event: CreatedJournalist): void {
  const journalist = createJournalist(event);
  journalist.save();
}

export function handleJounralistTipped(event: JounralistTipped): void {
  const journalist = getJournalist(event.params.journalist.toHexString());
  journalist.totalTips = journalist.totalTips.plus(event.params.tipAmount);

  journalist.save()
}

export function handleJournalistRated(event: JournalistRated): void {
  const journalist = getJournalist(event.params.journalist.toHexString());
  journalist.amountOfRatings = journalist.amountOfRatings.plus(BIG_INT_ONE);
  journalist.totalRating = journalist.totalRating.plus(event.params.rating);

  journalist.save()
  
}

export function handlePostedArticle(event: PostedArticle): void {
  const article = createArticle(event);
  article.save();

  const journalist = getJournalist(event.params.journalist.toHexString());
  let allArticles = journalist.allArticles;
  allArticles.push(event.params.id);
  journalist.allArticles = allArticles;
  journalist.save()
}

export function handleArticleDeleted(event: ArticleDeleted ): void {
  store.remove("Article", event.params.articleId.toString());
}