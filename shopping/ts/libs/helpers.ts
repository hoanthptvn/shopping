export class Helpers {
    //$ 20 - USD 20 - VND 20 - 20 USD 
    public static toCurrency(value: number, currenUnit: string, position: string = "right"): string {
        if (position == "left") {
            return currenUnit + ' ' + value;
        } else if (position == "right") {
            return value + ' ' + currenUnit;
        }
    }
}