<template>
    <ClientGetDiv>
        <ClientGetTitleArea>
            <AccountSupervisor />&nbsp;&nbsp;&nbsp;<span>수급자 목록</span>
        </ClientGetTitleArea>
        <ClientGetSearchArea>
            <ClientGetSearchInputTxt v-model="searchQuery" type="text" placeholder="검색어를 입력하세요" @keyup.enter="fetchData"/>
            <ClientGetSearchBtn @click="fetchData"><Magnify /></ClientGetSearchBtn>
        </ClientGetSearchArea>

        <div>
            <br/>
            <FontBold>조회된 수급자:&nbsp;&nbsp;{{ clients_info.total_cnt }}명</FontBold>
            <br/>
        </div>

        <ClientGetTable>
            <ClientGetTableThead>
                <ClientGetTableTr>
                    <th>수급자성함</th>
                    <th>인정번호</th>
                    <th>생년월일</th>
                    <th>대상</th>
                    <th class="address">주소</th>
                    <th>보호자성함</th>
                    <th>관계</th>
                    <th>담당자</th>
                </ClientGetTableTr>
            </ClientGetTableThead>
            <ClientGetTableTbody>
                <!-- 가져온 데이터를 v-for로 테이블에 표시 -->
                <ClientGetTableTr v-for="(client, index) in filteredClients" :key="index" :class="{
                    'success': client.target === '일반',
                    'danger': client.target === '기초',
                    'info': client.target === '의료급여',
                    'warning': client.target === '감경',
                    'client_tr': true,
                }" @click="clientDetail(client); clientModalClose()">
                    <td>{{ client.name }}</td>
                    <td>{{ client.number }}</td>
                    <td>{{ client.resident }}</td>
                    <td>{{ client.target }}</td>
                    <td class="address">{{ client.address }}</td>
                    <td>{{ client.guardName }}</td>
                    <td>{{ client.clientRelationInfo.guardTarget }}</td>
                    <td>{{ client.manager }}</td>
                </ClientGetTableTr>
            </ClientGetTableTbody>
        </ClientGetTable>
    </ClientGetDiv>
</template>

<script>
import { reactive } from 'vue';
import * as injectGlobal from '../assets/styles/public.js';
import * as ClientGetCss from '../assets/styles/ClientGetCss.js';
import AccountSupervisor from 'vue-material-design-icons/AccountSupervisor.vue';
import Magnify from 'vue-material-design-icons/Magnify.vue';
import { getClients } from '../api/client';

export default {
    components: {
        ...injectGlobal,
        ...ClientGetCss,
        AccountSupervisor,
        Magnify,
    },
    setup() {
        return {
            clients_info: reactive({
                clients: [],
                total_cnt: 0,
            }),
            searchQuery: '',
        };
    },
    computed: {
        filteredClients() {
            return this.clients_info.clients.filter(client => 
                client.name.includes(this.searchQuery)
            );
        },
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            try {
                const response = await getClients({
                    page: 1,
                    limit: 10,
                    search: this.searchQuery
                });
                this.clients_info.clients = response.items;
                this.clients_info.total_cnt = response.total;
            } catch (error) {
                console.error('데이터를 가져오는 중 오류 발생:', error);
            }
        },
        //ClientGetTableTr클릭시 해당 수급자의 상세정보를 OrderUpPage로 전달
        clientDetail(client) {
            this.$emit('clientDetail', client);
        },
        clientModalClose() {
            this.$emit('close');
        },
    },
};
</script>