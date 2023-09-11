import { DateTime } from "luxon";

export const dateToString = (date: Date) => DateTime.fromJSDate(date).toISO();
