<style>
    .nav select {
        width: 22%;
    }

    .nav div {
        width: 45%;
    }
</style>
<script>
    $('header input').click(function(){
        $('header div').addClass('rim').siblings().removeClass('rim');
    });
    $('header select').click(function(){
        $(this).addClass('rim').siblings().removeClass('rim');
    });
</script>
<header class="nav">
    <ul style="padding-top: 1rem;height: 4rem;">
        <select id="carNoPre">
            <option selected>粤T</option>
            <option>粤A</option>
        </select>

        <div><input id="carNo" type="search" placeholder="请输入号牌号码"></div>
        <button id="query" class="blue" style="margin-right: 1rem">查询</button>
    </ul>
    <ul class="gac_m">
        <ul id="data2">
        </ul>
    </ul>
</header>
<div style="width:100%; height:5rem;"></div>