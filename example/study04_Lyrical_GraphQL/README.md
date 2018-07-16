
```graphql
mutation AddSong($title: String) {
  addSong(title: $title) {
    id
    title
  }
}
```