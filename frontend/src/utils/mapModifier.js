function generateModifierClassNameArray(baseClassName, ...modifiers) {
  let classNameArray = [];

  for (const modifier of modifiers) {
    if (Array.isArray(modifier)) {
      classNameArray = classNameArray.concat(
        generateModifierClassNameArray(baseClassName, ...modifier)
      );
    } else if (typeof modifier === "string" && modifier.length > 0) {
      classNameArray.push(baseClassName + "--" + modifier);
    }
  }

  return classNameArray;
}

/**
 * Generate `className` from base class name and modifiers.
 */
export function mapModifiers(baseClassName, ...modifiers) {
  return (
    baseClassName +
    " " +
    generateModifierClassNameArray(baseClassName, ...modifiers)
      .join(" ")
      .trim()
  ).trim();
}
