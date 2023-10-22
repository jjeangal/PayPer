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
import { BIG_INT_ONE, ETHER, ZERO_ADDRESS } from "../lib/constants";
import { createPurchase } from "../entities/purchases";
import { sendPushNotification } from "../lib/helpers";
import { Address, BigDecimal, BigInt, Bytes } from "@graphprotocol/graph-ts";


export function handleArticlePurchased(event: ArticlePurchased): void {
  const article = getArticle(event.params.articleId.toString());
  article.totalPaymentReceived = article.totalPaymentReceived.plus(event.params.paidAmount);
  
  article.save()
  
  const purchase = createPurchase(event);
  purchase.save()

  let recipient = article.journalist.toHexString(),
  type = "3",
  title = `Payment Received from article: ${article.name}`,
  body = `Received ${(new BigDecimal(event.params.paidAmount).div(ETHER))} matic from ${event.params.purchaser.toHexString()}`,
  subject = "Payment Received",

  notification = `{\"type\": \"${type}\", \"title\": \"${title}\", \"body\": \"${body}\", \"subject\": \"${subject}\", \"message\": \"\", \"image\": \"\", \"secret\": \"\", \"cta\": \"\"}`
 
  sendPushNotification(
    recipient, 
    notification
    )
}

export function handleArticleRated(event: ArticleRated): void {
  const article = getArticle(event.params.articleId.toString());
  article.amountOfRatings = article.amountOfRatings.plus(BIG_INT_ONE);
  article.totalRating = article.totalRating.plus(event.params.rating);

  article.save()

  let recipient = article.journalist.toHexString(),
  type = "3",
  title = `Article ${article.name} Has Been Rated`,
  body = `Received ${new BigDecimal(event.params.rating)} for article: ${article.name}`,
  subject = "Article Rated",

  notification = `{\"type\": \"${type}\", \"title\": \"${title}\", \"body\": \"${body}\", \"subject\": \"${subject}\", \"message\": \"\", \"image\": \"\", \"secret\": \"\", \"cta\": \"\"}`
 
  sendPushNotification(
    recipient, 
    notification
    )
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

  let recipient = event.params.journalist.toHexString(),
  type = "3",
  title = `Received a Tip`,
  body = `Received ${new BigDecimal(event.params.tipAmount)} with a message: ${event.params.message}`,
  subject = "Received a Tip",

  notification = `{\"type\": \"${type}\", \"title\": \"${title}\", \"body\": \"${body}\", \"subject\": \"${subject}\", \"message\": \"\", \"image\": \"\", \"secret\": \"\", \"cta\": \"\"}`
 
  sendPushNotification(
    recipient, 
    notification
    )
}

export function handleJournalistRated(event: JournalistRated): void {
  const journalist = getJournalist(event.params.journalist.toHexString());
  journalist.amountOfRatings = journalist.amountOfRatings.plus(BIG_INT_ONE);
  journalist.totalRating = journalist.totalRating.plus(event.params.rating);

  journalist.save()

  let recipient = event.params.journalist.toHexString(),
  type = "3",
  title = `Received a Rating`,
  body = `Received ${new BigDecimal(event.params.rating)}`,
  subject = "Received a Rating",

  notification = `{\"type\": \"${type}\", \"title\": \"${title}\", \"body\": \"${body}\", \"subject\": \"${subject}\", \"message\": \"\", \"image\": \"\", \"secret\": \"\", \"cta\": \"\"}`
 
  sendPushNotification(
    recipient, 
    notification
    )
  
}

export function handlePostedArticle(event: PostedArticle): void {
  const article = createArticle(event);
  article.save();

  const journalist = getJournalist(event.params.journalist.toHexString());
  let allArticles = journalist.allArticles;
  allArticles.push(event.params.id);
  journalist.allArticles = allArticles;
  journalist.save()

  let recipient = ZERO_ADDRESS,
  type = "1",
  title = `${article.name} - published by: ${article.journalist.toHexString()}`,
  body = `${article.freeContent}`,
  subject = `${article.name}`,

  notification = `{\"type\": \"${type}\", \"title\": \"${title}\", \"body\": \"${body}\", \"subject\": \"${subject}\", \"message\": \"\", \"image\": \"\", \"secret\": \"\", \"cta\": \"\"}`
 
  sendPushNotification(
    recipient, 
    notification
    )
}

export function handleArticleDeleted(event: ArticleDeleted ): void {
  store.remove("Article", event.params.articleId.toString());
}