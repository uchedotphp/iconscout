export default ({ }, inject: any) => {
  function addHypen(q: string) {
    return q.trim().replace(/\s+/g, "-");
  }
  function addSpace(q: string) {
    return q.trim().replace(/-/g, " ");
  }

  inject("formatText", { addHypen, addSpace });
};
