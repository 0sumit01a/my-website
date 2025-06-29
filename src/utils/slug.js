export function generateSlug(name, id) {
  return (
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-") // replace non-alphanumeric with dashes
      .replace(/(^-|-$)/g, "")     // remove start/end dashes
    + "-" + id
  );
}
