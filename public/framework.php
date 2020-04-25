<?php



  $url_code = end(explode("/", "//{$_SERVER['HTTP_HOST']}{$_SERVER['REQUEST_URI']}"));
  srand($url_code);

  $title_prefix_array =  array(
    "Spastic", "Awesome", "Wank", "Shit", "Crap", "Balls",
    "Mong", "Div", "Idiot", "Pointless", "Rubbish", "Bollocks",
    "Awful", "Redundant", "Excess"
  );
  $title_prefix_count = count($title_prefix_array);
  $title_prefix_index = rand(0, $title_prefix_count - 1);

  $title_suffix_array =  array("ly", "ify", "ful", "");
  $title_suffix_count = count($title_suffix_array);
  $title_suffix_index = rand(0, $title_suffix_count - 1);


  $subtitle_prefix_array =  array(
    "Containerised", "Agile", "Flexible", "Dynamic", "Lightning-fast", "Awesome", "Ninja", "Expressive", "Lazy-loading", "Incremental",
    "Deep learning", "Machine-learning", "Powerful", "Platform-agnostic", "Polymorphic", "Multi-paradigm", "Battle-hardened", "Field-tested"
  );

  $subtitle_middle_array =  array(
    "stylesheets", "syntax", "workflow", "components", "layouts",
    "APIs", "scheduling", "event models", "paradigms"
  );
  $subtitle_suffix_array =  array(
    "at your fingertips", "out of the box",
    "at a click", "oven-ready", "on-demand",
    "done dynamically", "and then some",
    "reimagined"
  );
  $subtitle_prefix_count = count($subtitle_prefix_array);
  $subtitle_middle_count = count($subtitle_middle_array);
  $subtitle_suffix_count = count($subtitle_suffix_array);
  $subtitle_prefix_index = rand(0, $subtitle_prefix_count - 1);
  $subtitle_middle_index = rand(0, $subtitle_middle_count - 1);
  $subtitle_suffix_index = rand(0, $subtitle_suffix_count - 1);

  $subheadings =  array(
    "Containerised", "Agile", "Flexible",
    "Dynamic", "Lightning-fast", "Awesome",
    "Re-inventing the wheel",
    "Utterly Redundant", "Expressive",
    "Agnostic", "Polymorphic", "Multi-Paradigm",
    "Plugin-Oriented", "Does Nothing",
    "Powerful", "Battle-hardened", "Field-tested"
  );
  $subheadings_count = count($subheadings);

  $numbers = range(0, $subheadings_count - 1);
  shuffle($numbers);


  $summaries = array(
    "Weighing in at just " + rand(0, 20) + " bytes, it's literally useless"
  );


  $title = $title_prefix_array[$title_prefix_index] . $title_suffix_array[$title_suffix_index] . ".js";

  $subtitle = $subtitle_prefix_array[$subtitle_prefix_index] . " " .
              $subtitle_middle_array[$subtitle_middle_index] . ", " .
              $subtitle_suffix_array[$subtitle_suffix_index];

  $subheadings = array(
    $subheadings[$numbers[0]],
    $subheadings[$numbers[1]],
    $subheadings[$numbers[2]],
    $subheadings[$numbers[3]],
    $subheadings[$numbers[4]],
    $subheadings[$numbers[5]]
  );

  function rand_color() {
    return sprintf('#%06X', mt_rand(0, 0xFFFFFF));
  }

  $col_pairs = array(
    array("#222222", "#ffffff", "#666666", "#ff9900"),
    array("#6ec5ff", "#222222", "#205375",  "#eeeeee"),
    array("#faec35", "#2288aa", "#2288aa", "#faec35")
  );

  $col_index = rand(0, count($col_pairs) - 1);

  $base_col_pair = $col_pairs[$col_index];



  $bg = $base_col_pair[0];
  $fg = $base_col_pair[1];

  $bg1 = $base_col_pair[2];
  $fg2 = $base_col_pair[3];

  if(rand(0, 10) < 5)
  {
    //Swap sets
    $bg = $base_col_pair[2];
    $fg = $base_col_pair[3];
    $bg1 = $base_col_pair[0];
    $fg2 = $base_col_pair[1];
  }

  if(rand(0, 10) < 5)
  {
    //Swap p and s
    $bg = $base_col_pair[1];
    $fg = $base_col_pair[0];
    $bg1 = $base_col_pair[3];
    $fg2 = $base_col_pair[2];
  }


  $superlatives = array(
    "awesome", "janky", "blazing-fast", "expressive", "mediocre", "redundant"
  );


  function get_superlative()
  {
    global $superlatives;
    return $superlatives[rand(0, count($superlatives) - 1)];
  }



  function return_phrase($index)
  {
    switch($index)
    {
      case 0:
        return "A minimum-functionality philosophy leaves you free to write " . get_superlative() . " code!";
      case 1:
        return "It can't do much wrong if it doesn't do much at all.";
      case 2:
        return "It's a doddle to integrate, with an import-then-ignore philosophy.";
      case 3:
        return "Makes dependency-checking a breeze: it'll never have any, it'll never be one.";
      case 4:
        return "A modular, container-oriented philosophy, from install to uninstall";
      case 5:
        return "Weighing in at just " . rand(1, 20) . " bytes, it's literally useless.";
      case 6:
        return "Works well alongside all your favourite flavour-of-the-month frameworks.";
      case 7:
        return "Dependency-injection is a cinch, letting you design " . get_superlative() . " modular patterns.";

    }
  }

  $n_return_phrases = 7;

  $numbers = range(0, $n_return_phrases);
  shuffle($numbers);

  $phrases = array(
    return_phrase($numbers[0]),
    return_phrase($numbers[1]),
    return_phrase($numbers[2]),
    return_phrase($numbers[3]),
    return_phrase($numbers[4]),
    return_phrase($numbers[5])
  );



?>


<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <meta property="og:title" content="<?php echo $title; ?>">
    <meta property="og:image" content="icon.jpg">
    <title><?php echo $title; ?></title>
    <style>

    body, html {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: 0;
      margin: 0;
      font-family: Montserrat;
      background: <?php echo $bg; ?>;
      color: <?php echo $fg; ?>;
    }
    div {
      display: flex;
      box-sizing: border-box;
    }

    h1 {
      margin: 2rem;
      margin-bottom: 0.5rem;
      font-size: 3rem;
    }

    h2 {
      font-weight: 100;
    }

    button {
      font-family: Montserrat;
      background-color: <?php echo $fg; ?>;
      border: none;
      outline: none;
      padding: 1rem;
      color: <?php echo $bg; ?>;
      font-size: 1rem;
      border-radius: 0.25rem;
      cursor: pointer;
      margin-top: 2rem;
    }

    .main-screen {
      display: flex;
      flex-direction: column;
      position: absolute;
      width: 100%;
      height: 100%;
      align-items: center;

    }

    .three-columns {
        width: 100%;
        background: <?php echo $bg1; ?>;
        color: <?php echo $fg2; ?>;
        padding-left: 10%;
        padding-right: 10%;
        min-height: 15rem;
        /* justify-content: center; */
        /* align-items: center; */
        padding-top: 2rem;
        /* padding-bottom: 1rem; */
    }
    .column {
      flex-grow: 1;
      flex-basis: 0;
      align-items: center;
      flex-direction: column;
    }

    .column > h3 {
      font-size: 1.5rem;
      font-weight: 500;
      margin: 1rem;
      text-align: center;
    }

    .column > section {
      text-align: center;
      padding: 2rem;
      padding-top: 1rem;
    }

    @media (orientation: portrait) {
      body {
        /* font-size: 2vh; */
      }
      .three-columns {
        flex-direction: column;
        min-height: auto;
      }
      .main-screen {
        overflow-y: scroll;
      }
    }

    </style>
  </head>
  <body>
    <div class="main-screen">

      <h1><?php echo $title; ?></h1>
      <!-- <h1><?php echo $title; ?></h1> -->


      <h2><?php echo $subtitle; ?></h2>
      <div class="three-columns">
        <div class="column">
          <h3><?php echo $subheadings[0]; ?></h3>
          <section>
            <?php echo $phrases[0]; ?>
          </section>
        </div>
        <div class="column">
          <h3><?php echo $subheadings[1]; ?></h3>
          <section>
            <?php echo $phrases[1]; ?>
          </section>
        </div>
        <div class="column">
          <h3><?php echo $subheadings[2]; ?></h3>
          <section>
            <?php echo $phrases[2]; ?>
          </section>
        </div>
      </div>


      <h4>Unlock the <?php echo get_superlative(); ?></h4>
      <div class="three-columns">
        <div class="column">
          <h3><?php echo $subheadings[3]; ?></h3>
          <section>
            <?php echo $phrases[3]; ?>
          </section>
        </div>
        <div class="column">
          <h3><?php echo $subheadings[4]; ?></h3>
          <section>
            <?php echo $phrases[4]; ?>
          </section>
        </div>
        <div class="column">
          <h3><?php echo $subheadings[5]; ?></h3>
          <section>
            <?php echo $phrases[5]; ?>
          </section>
        </div>
      </div>

      <button onclick="regen()">Regenerate</button>

    </div>


    <script type="text/javascript" >
      function regen()
      {
        let split = window.location.href.split("/");
        split.splice(split.length - 1, 1);
        window.location.href = split.join("/") + "/" + Math.round(Math.random()*999999999999);
      }
    </script>
  </body>
</html>
