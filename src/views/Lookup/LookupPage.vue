<template>
  <!-- Modals -->
  <ModalPage
    v-model:show="showLookupModal"
    :height="modal_height"
    :width="modal_width"
    :parent="'lookup'"
  >
    <ModalRecentLookup
      :show="showLookupModal"
      @update:show="showLookupModal = $event"
      @cancel="showLookupModal = false"
      :source="'button'"
      :selectedLookupItems="selectedLookupItems"
    />
  </ModalPage>

  <BaseOrderTemplate
    :search-query="searchQuery"
    :detailSearchButton="false"
    :showPage="false"
    :items="lookupResults"
    search-placeholder="검색어를 입력하세요."
    @update:search-query="searchQuery = $event"
    @search="loadLookupData"
    ref="baseTemplate"
    :headerInfoClass="'minWidth0'"
  >
    <!-- Title Title -->
    <template #title-icon>
      <span class="material-icons">history</span>
    </template>
    <template #title-text> 최근조회기록 </template>

    <template #header-buttons>
      <FlexColumnLeft class="width100">
        <div class="width100">
          <FlexRight>
            <OptionCheck
              >전체 담당자
              <input type="checkbox" v-model="allOptionCheck" />
            </OptionCheck>
            <div>조회 회수 :</div>
            <LookupCount> {{ lookupResults.length }}명 </LookupCount>
          </FlexRight>
        </div>
      </FlexColumnLeft>
    </template>

    <template #table>
      <TableContainer>
        <DataTable>
          <thead class="blueTh">
            <tr>
              <th>번호</th>
              <th>수급자성함</th>
              <th>인정번호</th>
              <th>생년월일</th>
              <th>대상</th>
              <th class="mobileNone">등급</th>
              <th class="mobileNone">사용가능금액</th>
              <th class="mobileNone">구매가능품목</th>
              <th class="mobileNone">대여중인품목</th>
              <th class="mobileNone">시설이용유무</th>
              <th>일자</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in lookupResults" :key="item.id" :class="getRowClass(item.target)" @click="selectLookupModal(item)">
                <td>{{ index + 1 }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.number }}</td>
                <td>{{ item.resident }}</td>
                <td>{{ item.target }}</td>
                <td class="mobileNone">{{ item.ranker }}</td>
                <td class="mobileNone">{{ parseInt(item.money).toLocaleString() }}원</td>
                <td class="mobileNone">
                  <div v-for="product in item.clientLookupHistoryBuyPossibles" :key="product.id">
                    {{ product.productCategory.name }}
                  </div>
                </td>
                <td class="mobileNone">
                  <div v-for="product in item.clientLookupHistoryRents" :key="product.id">
                    {{ product.productCategory.name }}
                  </div>
                </td>
                <td class="mobileNone">{{ item.sisulState }}</td>
                <td>{{ new Date(item.createdAt).toISOString().replace('T', ' ').substring(0, 19) }}</td>
              </tr>
          </tbody>
        </DataTable>
      </TableContainer>
    </template>
  </BaseOrderTemplate>
</template>

<script>
import { ref, onMounted, getCurrentInstance } from "vue";
import BaseOrderTemplate from "@/components/BaseOrderTemplate.vue";
import * as LookupPageCss from "@/assets/styles/lookup/LookupPageCss";
import * as PublicCss from "@/assets/styles/public";
import ModalPage from "@/components/modal/ModalPage.vue";
import ModalRecentLookup from "@/components/modal/recentlookup/ModalReceontLookup.vue";
import { getLookupData } from "@/api/lookup";

export default {
  name: "LookupPage",
  components: {
    BaseOrderTemplate,
    ...LookupPageCss,
    ...PublicCss,
    ModalPage,
    ModalRecentLookup,
  },
  setup() {
    const instance = getCurrentInstance();
    const root = instance?.appContext.config.globalProperties;
    // 상태 관리
    const searchQuery = ref("");
    const allOptionCheck = ref(false);
    const showLookupModal = ref(false);
    const lookupResults = ref([]);
    const modal_height = ref("70%");
    const modal_width = ref("90%");
    const selectedLookupItems = ref(null);

    const loadLookupData = async () => {
      root.$swalLoading();
      const response = await getLookupData(50);
      lookupResults.value = response.items;
      root.$swalClose();
    };

    const selectLookupModal = (item) => {
      selectedLookupItems.value = item;
      showLookupModal.value = true;
    };

    const getRowClass = (target) => {
      const cleanTarget = target;
      if (cleanTarget.includes("감경")) return "yellow";
      if (cleanTarget.includes("기초")) return "red";
      if (cleanTarget.includes("의료급여")) return "blue";
      return "green";
    };

    onMounted(() => {
      loadLookupData()
    });

    return {
      searchQuery,
      allOptionCheck,
      lookupResults,
      showLookupModal,
      modal_height,
      modal_width,
      selectedLookupItems,
      getRowClass,
      loadLookupData,
      selectLookupModal,
    };
  },
};
</script>
