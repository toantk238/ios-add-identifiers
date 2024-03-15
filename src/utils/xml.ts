export function getChildNode(
  node: HTMLButtonElement,
  tag: string,
): ChildNode | undefined {
  const childNodes = node.childNodes;
  for (let i = 0; i < childNodes.length; i++) {
    let item = childNodes[i];
    if (item.nodeName == tag) return item;
  }
  return undefined;
}
