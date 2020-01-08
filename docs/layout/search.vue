<template>
  <div class="wot-input">
    <input
      type="text"
      class="wot-input__inner"
      id="search_input"
      placeholder="搜索文档"
    >
  </div>
</template>
<script>
import 'docsearch.js/dist/cdn/docsearch.min.css'
import docsearch from 'docsearch.js'

export default {
  data() {
    return {
      queryText: ""
    }
  },
  mounted () {
    docsearch({
      apiKey: '2e031c5218bf2d41b5b9aa75aec4f725',
      indexName: 'wot-design-mini',
      inputSelector: '#search_input',
      debug: true // Set debug to true if you want to inspect the dropdown
    })
  }
}
</script>

<style lang="scss" scoped>

.wot-input {
  margin-right: 30px;
}
.wot-input__inner {
  display: block;
  width: 100%;
  padding: 10px 15px;
  font-size: inherit;
  color: #333;
  box-sizing: border-box;
  outline: none;
  border: 1px solid #ebeef5;
  border-radius: 5px;
  &:hover{
    cursor: pointer;
  }
}
.algolia-autocomplete .algolia-docsearch-suggestion--subcategory-column{
  line-height: 50px;
  height: 50px;
}
.algolia-autocomplete .algolia-docsearch-suggestion--content {
  height: 50px !important;
  line-height: 50px !important;
}
</style>