export function getChildNode(node: Element, tag: string): Element | undefined {
  const childNodes = node.childNodes;
  for (let i = 0; i < childNodes.length; i++) {
    let item = childNodes[i];
    if (item.nodeName == tag) return item as any;
  }
  return undefined;
}

export function getChildNodes(node: Element, tag: string): Element[] {
  const result = [];
  const childNodes = node.childNodes;
  for (let i = 0; i < childNodes.length; i++) {
    let item = childNodes[i];
    if (item.nodeName == tag) result.push(item);
  }
  return result as any;
}
