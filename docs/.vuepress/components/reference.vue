<template>
  <div>
    <input class='filter-input' @input='_handleInputChange' placeholder="filter" v-model='keyword' type="text" />
    <ul class='list'>
      <li class='item' v-for='(item, index) in filterApiList' @click='go(item)' :key='index'>
        <icon :type='item.type' />
        <span :class='{deprecated: item.deprecated}'>{{item.label}}</span>
      </li>
    </ul>
  </div>
</template>
<script>
import apiList from './apiList'
export default {
  name: 'reference',
  data() {
    return {
      apiList,
      filterApiList: apiList,
      keyword: '',
      timer: '',
      canFilter: true,
    }
  },
  methods: {
    go(item) {
      let label = item.label.split(' ').join('')
      if (label.indexOf('deprecated') > -1) {
        label = item.url
      }
      this.$router.push(`/doc/reference/index/${label}.html`)
    },
    _handleInputChange() {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this._doFilter()
      }, 300)
    },
    _doFilter() {
      this.filterApiList = this.apiList.filter(v => v.label.indexOf(this.keyword) > -1)
    }
  }
}
</script>

<style>
.filter-input{  
  box-shadow: 0 2px 2px rgb(10 16 20 / 24%), 0 0 2px rgb(10 16 20 / 12%);
  box-sizing: border-box;
  border: 1px solid #fff;
  color: #1e88e5;
  font-size: 16px;
  height: 32px;
  line-height: 32px;
  outline: 0;
  padding: 0 16px;
  transition: all .2s
}
.filter-input:focus{  
  border-color: #1e88e5;
}
.list{
  display: flex;
  flex-wrap: wrap;
  width: 900px;
  justify-content: space-between;
}
.list li{
  list-style-type: none;
  width: 285px;
  font-size: 14px;
  margin-bottom: 10px;
  cursor: pointer;
  padding: 0px 3px;
  border-radius: 2px;
  transition: all .2s
}
.list li:hover{
  background: rgb(233, 237, 239);
  color: #1e88e5;
}
.deprecated{
  text-decoration: line-through;
}
</style>