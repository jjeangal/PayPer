import { ArticlePurchased } from "../../generated/Contract/Contract";
import { Journalist, Purchase } from "../../generated/schema";
import { BIG_INT_ZERO } from "../lib/constants";


export function createPurchase(event: ArticlePurchased): Purchase {
  let id = event.params.purchaser.toHexString() + event.params.articleId.toString();
  let purchase = Purchase.load(id);

  if (purchase == null) {
    purchase = new Purchase(id);
    purchase.articleId = event.params.articleId;
    purchase.price = event.params.paidAmount;
    purchase.purchaser = event.params.purchaser;
    }

  return purchase as Purchase;
}
