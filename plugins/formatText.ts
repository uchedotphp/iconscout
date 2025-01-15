export default ({ }, inject: any) => {
  function addHypen(q: string) {
    return q?.trim()?.toLocaleLowerCase()?.replace(/\s+/g, "-");
  }
  function addSpace(q: string) {
    return q?.trim()?.toLocaleLowerCase()?.replace(/-/g, " ");
  }
  function capitalizeFirstLetters(q: string) {
    return q?.replace(/\b\w/g, (char: string) => char?.toUpperCase());
  }

  inject("formatText", { addHypen, addSpace, capitalizeFirstLetters });
};
