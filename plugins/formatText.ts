export default ({ }, inject: any) => {
  function addHypen(q: string) {
    return q.trim().toLocaleLowerCase().replace(/\s+/g, "-");
  }
  function addSpace(q: string) {
    return q.trim().toLocaleLowerCase().replace(/-/g, " ");
  }

  inject("formatText", { addHypen, addSpace });
};
