<script lang="ts">
    import type { ActionData } from "./$types"
    export let form: ActionData
</script>

<h1>スレッド投稿</h1>
{#if form?.message}
    {form.message}
{/if}
<form method="post" action="?/post">
    <label for=""> 内容:
        <input type="text" name="content" />
    </label>
    <button>投稿する</button>
</form>