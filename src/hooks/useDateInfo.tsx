import { useMemo } from "react";
import { add, addDays, set, nextMonday, format, setMinutes } from "date-fns";

const useDateInfo = () => {
  const today = useMemo(() => new Date(), []);

  // Reuse tomorrow and nextMonday calculations
  const tomorrow = useMemo(() => addDays(today, 1), [today]);
  const nextMondayDate = useMemo(() => nextMonday(today), [today]);

  // Time calculations
  const laterToday = useMemo(
    () => setMinutes(add(today, { hours: 4 }), 0),
    [today]
  );
  const tomorrowAt9 = useMemo(
    () => set(tomorrow, { hours: 9, minutes: 0, seconds: 0 }),
    [tomorrow]
  );
  const nextMondayAt9 = useMemo(
    () => set(nextMondayDate, { hours: 9, minutes: 0, seconds: 0 }),
    [nextMondayDate]
  );

  // Abbreviated formats
  const lateTodayAbbrev = useMemo(
    () => format(laterToday, "hh:mm a"),
    [laterToday]
  );
  const tomorrowAt9Abbrev = useMemo(
    () => format(tomorrowAt9, "EEE, hh:mm a"),
    [tomorrowAt9]
  );
  const nextMondayAt9Abbrev = useMemo(
    () => format(nextMondayAt9, "EEE, hh:mm a"),
    [nextMondayAt9]
  );

  // Day abbreviation and checks
  const dayAbbrev = useMemo(() => format(today, "EEE"), [today]);
  const tomorrowAbbrev = useMemo(() => format(tomorrow, "EEE"), [tomorrow]);
  const nextMondayAbbrev = useMemo(
    () => format(nextMondayDate, "EEE"),
    [nextMondayDate]
  );
  const isTomorrowMonday = useMemo(
    () => format(tomorrow, "EEEE") === "Monday",
    [tomorrow]
  );
  const isTomorrowMondayAt9 = useMemo(
    () => format(tomorrowAt9, "EEEE") === "Monday",
    [tomorrowAt9]
  );

  return {
    today,
    laterToday,
    tomorrow,
    nextMondayDate,
    tomorrowAt9,
    nextMondayAt9,
    lateTodayAbbrev,
    tomorrowAt9Abbrev,
    nextMondayAt9Abbrev,
    isTomorrowMondayAt9,
    dayAbbrev,
    tomorrowAbbrev,
    nextMondayAbbrev,
    isTomorrowMonday,
  };
};

export default useDateInfo;
