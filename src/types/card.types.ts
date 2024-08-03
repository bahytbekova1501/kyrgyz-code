export type StyleType =
  | "text"
  | "text-picture"
  | "text-bgImage"
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
