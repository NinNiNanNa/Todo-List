import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    bgColor: string;
    textColor: string;
    cardBgColor: string;
    warningColor: string;
    modalBgColor: string;
    modalTextColor: string;
  }
}
