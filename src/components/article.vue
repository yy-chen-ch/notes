<template>
  <div class="article shadow rounded-md box-border relative">
    <!-- // 添加内容后 -->
    <div class="show text-center" v-if="add_lists.length != 0" style="padding-bottom: 70px">
      <div v-for="(v, i) in add_lists" :key="v.content">
        <div class="content_box">
          <!-- 添加内容按钮 -->
          <div class="push_box">
            <ul class="flex-center push mb">
              <li class="item flex-center" v-for="item in cates" :key="item.p">
                <el-upload
                  action="#"
                  :show-file-list="false"
                  :http-request="upload"
                  :data="{ type: item.info, index: i }"
                  v-if="item.info == 'img' || item.info == 'video'"
                >
                  <img :src="item.icon" width="20" height="20" />
                </el-upload>
                <img
                  :src="item.icon"
                  width="20"
                  height="20"
                  class="pointer"
                  @click="to_add(item.info, i)"
                  v-else
                />
              </li>
            </ul>
          </div>
          <!-- 正在添加内容 -->
          <el-input
            v-if="adding_flag & (add_index == i)"
            autosize
            ref="input_ele"
            v-model="add_content"
            type="textarea"
            placeholder="Please input"
            @blur="add_push"
            class="ml-16 mt-16 mb b-box"
            style="width: 90%"
          />

          <!-- 内容 -->
          <div class="content hoverp">
            <div class="hovers content_close" style="right: 20px;">
              <img :src="closeIcon" width="20" height="20" @click="del_content(i)">
            </div>
            <div v-if="v.type == 'img'">
              <img :src="v.content" alt="" />
            </div>
            <div v-if="v.type == 'video'">
              <p>{{ v.content }}</p>
            </div>
            <div v-if="v.type == 'p'">
              <p>{{ v.content }}</p>
            </div>
            <div v-if="v.type == 'code'">
              <p>{{ v.content }}</p>
            </div>
          </div>
        </div>
      </div>
      <!-- 添加内容按钮 -->
      <div class="push_box">
        <ul class="flex-center push mb">
          <li class="item flex-center" v-for="item in cates" :key="item.p">
            <el-upload
              action="#"
              :show-file-list="false"
              :http-request="upload"
              :data="{ type: item.info, index: -1 }"
              v-if="item.info == 'img' || item.info == 'video'"
            >
              <img :src="item.icon" width="20" height="20" class="pointer" />
            </el-upload>
            <img
              :src="item.icon"
              width="20"
              height="20"
              class="pointer"
              @click="to_add(item.info, -1)"
              v-else
            />
          </li>
        </ul>
      </div>
      <el-input
        v-if="adding_flag & (add_index == -1)"
        autosize
        ref="input_ele"
        v-model="add_content"
        type="textarea"
        placeholder="Please input"
        @blur="add_push"
        class="ml-16 mt-16 mb b-box"
        style="width: 90%"
      />
    </div>
    <!-- // 未添加内容是 -->
    <div class="add relative flex justify-center self-center" v-else>
      <div style="width: 40%">
        <p class="title text-center"> 发布你独一无二的作品吧</p>
        <ul class="flex justify-center self-center">
          <el-upload
            action="#"
            :show-file-list="false"
            :http-request="upload"
            v-for="item in cates"
            :key="item"
            :data="{ type: item.info, index: -1 }"
          >
            <div class="t-center">
              <img :src="item.icon" />
              <p class="c-33 fs-16">{{ item.p }}</p>
            </div>
          </el-upload>
        </ul>
      </div>
    </div>
    <div class="bottom absolute flex-between w-100 b-box bg-white">
      <div class="left is-flex">
        <div class="ys align-center">
          <!-- <img :src="bianji_svg" /> -->
          <p class="ml-12 mr-24">样式</p>
        </div>
        <div class="sz align-center">
          <!-- <img :src="shezhi_svg" class="ml-24 mr-12" /> -->
          <p>设置</p>
        </div>
      </div>
      <div class="center is-flex">
        <div
          class="pre align-center fs-16 c-ef pointer"
          @click="$router.push({ path: '/details/article' })"
        >
          <el-icon>
            <search />
          </el-icon>
          <span class="ml-16 mr-16">查看预览</span>
        </div>

        <button class="hover-bgblue" @click="save_draft">保存为草稿</button>
      </div>
      <div class="right">
        <button
          @click="
            $router.push({
              path: '/publish/sample',
              query: { type: 'mall', op: 'edit' }
            })
          "
          class="hover-bgblue"
        >
          继续
        </button>
      </div>
    </div>
    <!-- <router-link
      class="rb is-fixed shadow b-box pointer flex-center"
      to="/user/publish/artplish"
    >
      <img :src="add_svg" width="20" height="20" />
    </router-link>
    <p-toast :p="p_toast_content" v-if="p_toast_flag"></p-toast> -->
  </div>
</template>

<script setup>
import code_svg from "@/assets/svg/code.svg"
import img_svg from "@/assets/svg/img.svg"
import text_svg from "@/assets/svg/text.svg"
import video_svg from "@/assets/svg/video.svg"
import { nextTick, reactive, ref } from 'vue'



const cates = [
  { icon: img_svg, p: '图像', info: 'img' },
  { icon: text_svg, p: '文本', info: 'p' },
  { icon: code_svg, p: '嵌入代码', info: 'code' },
  { icon: video_svg, p: '视频', info: 'video' }
]

const add_lists = reactive([])

const add_index = ref(-1)
const add_content = ref('')
const add_type = ref('')
const add_flag = ref(false)
const adding_flag = ref(false)
const upload = (params) => {
  const fileobj = params.file
  const form = new FormData()
  form.append('file', fileobj)
  req
    .post('/media/upload', form, {
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        token: localStorage.getItem('token')
      }
    })
    .then((res) => {
      add_type.value = params.data.type
      add_index.value = params.data.index
      add_content.value = res.data.media_url
      add_flag.value = true
      add_push()
    })
}
const input_ele = ref(null)
const to_add = (type, i) => {
  adding_flag.value = true
  add_index.value = i
  add_type.value = type

}
const add_push = () => {
  adding_flag.value = false
  if (add_content.value == '') return
  if (add_index.value == -1) {
    add_lists.push({ type: add_type.value, content: add_content.value })
  } else {
    add_lists.splice(add_index.value, 0, {
      type: add_type.value,
      content: add_content.value
    })
  }
  add_reset()
}
const del_content = (i) => {
  add_lists.splice(i, 1)
}
const add_reset = () => {
  add_index.value = -1
  add_content.value = ''
  add_type.value = ''
  adding_flag.value = false
}

const p_toast_flag = ref(false)
const p_toast_content = ref('已保存到草稿')
const save_draft = () => {
  p_toast_flag.value = true
  setTimeout(() => {
    p_toast_flag.value = false
  }, 2500)
}
</script>

<style scoped lang="scss">
// .article {
//   width: 1550px;
//   height: calc(100vh - 104px);
//   padding-top: 24px;
//   margin: 0px auto;

//   .show {
//     input {
//       margin: 40px 0px;
//       font-size: 18px;
//       border: none;
//       outline: none;
//     }
//     .small {
//       padding: 26px 110px;
//       margin-bottom: 80px;
//     }
//   }
//   .add {
//     height: 100%;
//     .title {
//       font-size: 24px;
//       font-weight: 400;
//       margin: 0px auto 102px;
//     }
//     ul {
//       margin: 0px auto;
//       img {
//         width: 34px;
//         height: 29px;
//       }
//     }
//   }
// }

// .bottom {
//   padding: 16px 32px;
//   left: 0;
//   bottom: 0;
//   .left {
//     img {
//       width: 15px;
//       height: 15px;
//     }
//   }
//   .pre:hover {
//     color: #ccc;
//   }
//   button {
//     box-sizing: border-box;
//     padding: 9px 14px;
//     color: #ffffff;
//     font-weight: bold;
//     border-radius: 21px;
//     cursor: pointer;
//   }
//   button:hover {
//     opacity: 0.86;
//   }
// }

// .rb {
//   right: 24px;
//   bottom: 24px;
//   width: 56px;
//   height: 56px;
//   padding: 10px;
//   border-radius: 50%;
//   img {
//     width: 100%;
//   }
// }
// .rb:hover {
//   opacity: 0.86;
// }

// .show {
//   max-height: calc(100vh - 135px);
//   overflow: auto;
//   .el-textarea {
//     width: 90;
//   }
//   .push {
//     visibility: hidden;

//     .item {
//       width: 40px;
//       height: 40px;
//       &:hover {
//         background: #efefef;
//       }
//     }
//   }
//   .push_box:hover {
//     .push {
//       visibility: visible;
//     }
//   }
// }
</style>
