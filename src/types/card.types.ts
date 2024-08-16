export type StyleType =
  | "text"
  | "text-picture"
  | "text-bgImage"
  | "picture-text"
  | "text-btn";
export type PortfolioCardStyleType =
  | "text"
  | "bgImage"
  | "picture-text"
  | "text-btn";
export interface CardForm {
  id: number;
  title: string;
  desc: string;
  image: string;
  styleType: StyleType;
}
export interface CardTypes {
  id: number;
  title: string;
  desc: string;
  image: string;
  styleType: StyleType;
}
export interface PortfolioCardForm {
  id: number;
  title: string;
  btnImg: string;
  image: string;
  link: string;
  styleType: PortfolioCardStyleType;
}

export interface PortfolioCardTypes {
  id: number;
  title: string;
  btnImg: string;
  image: string;
  link: string;
  styleType: PortfolioCardStyleType;
}

export interface PortfolioProductForm {
  // id: number;
  title: string;
  company: string;
  days: string;
  card: PortfolioCardForm[];
}
export interface PortfolioProductTypes {
  id: number;
  title: string;
  company: string;
  days: string;
  card: PortfolioCardTypes[];
}
