function CollectionBar({ collection }) {
  return <aside className="collection-strip"><span>YOUR COLLECTION</span>
    {Array.from({ length: 6 }, (_, index) => <div className={collection[index] ? 'filled' : ''} key={index}>
      {collection[index] ? <><b>{index + 1}</b><strong>{collection[index].name}</strong></> : <b>{index + 1}</b>}
    </div>)}
  </aside>
}

export default CollectionBar
