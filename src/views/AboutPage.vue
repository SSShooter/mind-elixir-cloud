<template>
  <div class="about prose m-auto mt-28">
    <!-- <div class="slogan">
      In one corner of the streaming mind, there appeared a blue beacon of
      inspiration
    </div> -->
    <ReadMe />
    <!-- <h2>TODO List</h2>
      <ul>
        <li>完善文档</li>
        <li>思维导图自由节点</li>
        <li>实现组织结构图</li>
        <li>使用 electron 实现离线浏览</li>
      </ul> -->
    <p class="list">{{ t("about['1']") }}</p>
    <p class="list">{{ t("about['2']") }}</p>
    <p class="list">{{ t("about['3']") }}</p>
    <!-- <div class="donate">
      <span class="coffee">
        <span class="iconfont">&#xe608;</span> Donate
      </span>
      <el-tooltip placement="top">
        <div slot="content">
          <img style="width: 150px" src="@/assets/alipay.png" />
        </div>
        <el-button><span class="iconfont">&#xe60a; </span>Alipay</el-button>
      </el-tooltip>
      <el-tooltip placement="top">
        <div slot="content">
          <img style="width: 150px" src="@/assets/wechat.png" />
        </div>
        <el-button>
          <span class="iconfont">&#xe607; </span>WeChat Pay
        </el-button>
      </el-tooltip>
      <a href="https://paypal.me/ssshooter?locale.x=zh_XC" target="_blank">
        <el-button>
          <span class="iconfont">&#xea24;</span>
        </el-button>
      </a>
    </div> -->
  </div>
</template>
<script setup lang="ts">
// @ts-ignore
import ReadMe from 'mind-elixir/readme.md'
// import mdcn from 'mind-elixir/readme.cn.md?raw'
import { useI18n } from 'vue-i18n';

const { t } = useI18n()
</script>

<style lang="less">
.about {
  a > img {
    display: inline-block;
    margin: 0 5px;
  }
  .slogan {
    color: #3b5b82;
    font-weight: bold;
    margin-bottom: 25px;
  }
  .list {
    margin: 20px 0;
  }
  .donate {
    .coffee {
      color: #ff5656;
      font-size: 18px;
      padding: 6px 10px;
    }
    a {
      margin-left: 10px;
    }
    .el-button {
      font-size: 16px;
      padding: 6px 10px;
    }
  }
}
</style>
