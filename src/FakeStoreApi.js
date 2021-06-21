const FakeStoreApi = (props) => {
    return (
        fetch('https://fakestoreapi.com/products')
        .then(data => data.json())
        .then(jsonData => props.api(jsonData))
    )
}

export default FakeStoreApi;