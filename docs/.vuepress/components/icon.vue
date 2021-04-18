<template>
  <span class='icon' :class='{badge}' :style='{background: typeMap[type].color}'>
    {{badge ? typeMap[type].label : typeMap[type].icon}}
  </span>
</template>

<script>
export default {
  name: 'Icon',
  data() {
    const typeMap = {
      class: {
        icon: 'c',
        label: 'Class',
        color: '#2196f3',
      }, 
      const: {
        icon: 'K',
        label: 'Const',
        color: '#6e6e6e',
      }, 
      decorator: {
        icon: '@',
        label: 'Decorator',
        color: '#1565c0',
      },
      directive: {
        icon: 'D',
        label: 'Directive',
        color: '#d81b60',
      },
      enum: {
        icon: 'E',
        label: 'Enum',
        color: '#ffa000',
      },
      function: {
        icon: 'F',
        label: 'Function',
        color: '#2e7d32',
      },
      interface: {
        icon: 'I',
        label: 'Interface',
        color: '#009688',
      },
      pipe: {
        icon: 'P',
        label: 'Pipe',
        color: '#546e7a',
      },
      'type-alias': {
        icon: 'T',
        label: 'Type alias',
        color: '#7cb342',
      },
    }
    return {
      typeMap
    }
  },
  props: {
    type: {
      type: String,
      default: 'Class'
    },
    badge: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>
.icon {
  display: inline-block;
  min-width: 16px;
  height: 16px;
  font-weight: 600;
  line-height: 16px;
  font-size: 14px;
  border-radius: 2px;
  box-shadow: 0 1px 2px rgb(10 16 20 / 24%);
  text-align: center;
  color: #fff;
}
.badge{
  padding: 2px 10px !important;
}
</style>