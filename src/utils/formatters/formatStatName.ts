export const formatStatName = (stat: string): string => {
  const formatStatMap: Record<string, string> = {
    "special-attack": "SP Attack",
    "special-defense": "SP Defense",
  };

  if (formatStatMap[stat]) {
    return formatStatMap[stat];
  }

  return stat;
};
