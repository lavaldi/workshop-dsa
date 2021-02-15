function createNode() {
  const children = {}

  return {
    children,
    endOfWord: false,
  }
}

function createTrie() {
  const root = createNode()

  return {
    root,
    insert(word) {
      let current = root;
      for(let i = 0; i < word.length; i++) {
        const char = word.charAt(i);
        let node = current.children[char];
        if (node === undefined) {
          node = createNode();
          current.children[char] = node;
        }
        current = node;
      }
      current.endOfWord = true;
    },
    delete(word) {
      this.deleteRecursively(root, word, 0);
    },
    deleteRecursively(current, word, index) {
      if(index === word.length) {
        // when end of word is reached only delete ig current.end of word is true
        if (!current.endOfWord) {
          return false;
        }
        current.endOfWord = false;
        // if current has no other mapping the return true
        return Object.keys(current.children).length === 0;
      }
      const char = word.charAt(index);
      const node = current.children[char];
      if (node === undefined) {
        return false;
      }
      const shouldDeleteCurrentNode = this.deleteRecursively(node, word, index + 1);

      // if true is returned then
      // delete the mapping of character and trie node reference from map
      if(shouldDeleteCurrentNode) {
        delete current.children[char];
        // return true if no mappings are left in the map
        return Object.keys(current.children).length === 0;
      }
      return false;
    },
    search(word) {
      let current = root;
      for(let i = 0; i < word.length; i++) {
        const char = word.charAt(i);
        const node = current.children[char];
        if (node === undefined) {
          return false;
        }
        current = node;
      }
      return current.endOfWord;
    },
  }
}

const trie = createTrie();
trie.insert("camila");
trie.insert("carlos");
console.log(trie.search("camila")); // true
trie.delete("camila");
trie.delete("carlos");
console.log(trie.search("camila")); // false
console.log(trie.search("carlos")); // false