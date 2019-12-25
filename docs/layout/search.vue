<template>
  <div class="search">
    <ais-instant-search :search-client="searchClient" index-name="dev_wot">
      <ais-search-box placeholder="Search here…" class="searchbox" />
      <ais-hits class="search-result__wrapper">
        <template slot="item" slot-scope="{ item }">
          <span >
            <ais-highlight :hit="item" attribute="company" />
          </span>
        </template>
      </ais-hits>
    </ais-instant-search>
  </div>
</template>
<script>
import algoliasearch from "algoliasearch/lite"

export default {
  data() {
    return {
      queryText: "",
      searchClient: algoliasearch(
        "YDYIZFKA95",
        "cb7f773081c7e09303920c09150a767e"
      )
    };
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      // const algoliasearch = require('algoliasearch');
      // const algoliasearch = require('algoliasearch/reactnative');
      // const algoliasearch = require('algoliasearch/lite');
      // import * as algoliasearch from 'algoliasearch'; // When using TypeScript
      // or just use algoliasearch if you are using a <script> tag
      // if you are using AMD module loader, algoliasearch will not be defined in window,
      // but in the AMD modules of the page
      // const client = algoliasearch(
      //   "YDYIZFKA95",
      //   "cb7f773081c7e09303920c09150a767e"
      // );
      // const index = client.initIndex("contacts");
      // console.log(index);
      // // 开始搜索
      // index.search(this.queryText.toString(), (err, { hits } = {}) => {
      //   console.log(hits);
      //   this.queryResult = hits
      // });
      // index.setSettings({
      //   'searchableAttributes': [
      //     'lastname',
      //     'firstname',
      //     'company',
      //     'email',
      //     'city',
      //     'address'
      //   ]
      // }, (err, content) => {
      //   console.log(content);
      // })
      // 设置搜索的条件（customRanking）， followers
      // index.setSettings({
      //   'customRanking': ['desc(followers)']
      // }, (err, content) => {
      //   // content 成功
      //   console.log(content)
      // })
      // 开始索引
      // index.addObjects(contactsJSON, (err, content) => {
      //   if (err) {
      //     console.error(err)
      //   } else {
      //     console.log(content)
      //   }
      // })
    },
    querySearch(query, cb) {
      // if (!query) return
      // this.index.search({ query, hitsPerPage: 6 }, (err, res) => {
      //   if (err) {
      //     console.error(err)
      //     return
      //   }
      //   if (res.hits.length > 0) {
      //     this.isEmpty = false
      //     cb(
      //       res.hits
      //         .map(hit => {
      //           let content = hit._highlightResult.content.value.replace(
      //             /\s+/g,
      //             " "
      //           )
      //           const highlightStart = content.indexOf(
      //             '<span class="algolia-highlight">'
      //           )
      //           if (highlightStart > -1) {
      //             const startEllipsis = highlightStart - 15 > 0
      //             content =
      //               (startEllipsis ? "..." : "") +
      //               content.slice(
      //                 Math.max(0, highlightStart - 15),
      //                 content.length
      //               )
      //           } else if (content.indexOf("|") > -1) {
      //             content = ""
      //           }
      //           return {
      //             anchor: hit.anchor,
      //             component: hit.component,
      //             highlightedCompo: hit._highlightResult.component.value,
      //             title: hit._highlightResult.title.value,
      //             content
      //           }
      //         })
      //         .concat({ img: true })
      //     )
      //   } else {
      //     this.isEmpty = true
      //     cb([{ isEmpty: true }])
      //   }
      // })
    }
  }
};
</script>

<style lang="scss">
.search {
  display: inline-block;
  margin-right: 30px;
}
.wot-input {
  position: relative;
  &:after {
    position: absolute;
    content: "";
    bottom: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: #c5c5c5;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
  }
}
.wot-input__inner {
  display: block;
  width: 100%;
  padding: 10px 0;
  font-size: 14px;
  color: #333;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  outline: none;
  border: none;
}
.search-result__wrapper {
  position: absolute;
  width: 300px;
  height: auto;
  background-color: transparent;
  font-size: 14px;
  color: #666;
  position: absolute;
  background-color: #fff;
  border: 1px solid #ebeef5;
  border-radius: 2px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
}
</style>