<template>
    <nav aria-label="Page navigation example">
        <ul class="pagination">
            <li class="page-item" v-if="currentPage !==1">
                <a class="page-link" @click="getTodo(currentPage - 1)" style="cursor:pointer" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li class="page-item" v-for="count in allPage" :key="count"
                :class="currentPage === count ? 'active': '' ">
                <a class="page-link" style="cursor:pointer" @click="getTodo(count)">{{count}}</a>
            </li>
            <li class="page-item" v-if="currentPage !== allPage">
                <a class="page-link" style="cursor:pointer" @click="getTodo(currentPage + 1)" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>
</template>


<script>
    export default {
        props: ['currentPage', 'allPage'],
        setup(props, context)  {

            const getTodo = (page) => {
                context.emit('page-show', page);
            }

            return {
                getTodo
            }
        }
    }
</script>


<style>

</style>