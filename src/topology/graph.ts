export function buildTopology(items: Array<Record<string, unknown>>) {
  const nodes = items.map((item, index) => ({
    id: String(item.id ?? index),
    label: String(item.type ?? 'EVENT'),
    group: String(item.caseFolio ?? item.provider ?? 'GENERAL')
  }))

  const edges = nodes.slice(1).map((node, index) => ({
    source: nodes[index].id,
    target: node.id,
    kind: 'SEQUENCE'
  }))

  return { nodes, edges }
}
