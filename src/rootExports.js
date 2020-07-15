import { router } from "umi";

let count = 0;

export const rootRouter = router;

export function getCount() {
  return count;
}

export function setCount(newCount) {
  count = newCount;
}
