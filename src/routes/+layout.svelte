
<script lang="ts">
    import { page } from '$app/stores'
    console.log($page.data.user)
</script>
{#if !$page.data.user}
    <a href="/login">ログイン</a>
    <a href="/register">新規登録</a>
{:else}
    <form action="/logout?/logout" method="POST">
        <button>ログアウト</button>
    </form>
{/if}

<slot />