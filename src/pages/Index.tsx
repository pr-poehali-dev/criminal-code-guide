import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface Article {
  number: string;
  title: string;
  priority: number;
}

const articles: Article[] = [
  { number: '6.1', title: 'Умышленное нанесение телесных повреждений', priority: 4 },
  { number: '6.2', title: 'Убийство, то есть умышленное причинение смерти другому человеку', priority: 4 },
  { number: '6.3', title: 'Тяжкое убийство, то есть убийство двух или более лиц', priority: 5 },
  { number: '6.7', title: 'Угроза расправой должностному лицу', priority: 3 },
  { number: '7.1', title: 'Похищение человека', priority: 5 },
  { number: '10.7', title: 'Неправомерное завладение автомобилем или иным транспортным средством (угон)', priority: 5 },
  { number: '10.8', title: 'Умышленные уничтожение или повреждение чужого имущества', priority: 3 },
  { number: '10.8.1', title: 'Умышленные уничтожение или повреждение государственного имущества', priority: 4 },
  { number: '12.7', title: 'Незаконное проникновение на закрытый в соответствии с законодательством штата Сан-Андреас, объект', priority: 3 },
  { number: '12.7.1', title: 'Незаконное проникновение на режимный объект, обладающий особым статусом (SANG/FIB)', priority: 4 },
  { number: '12.8', title: 'Незаконное приобретение, передача, сбыт, хранение, перевозка, ношение или использование любых видов оружия и боеприпасов', priority: 4 },
  { number: '12.8.1', title: 'Незаконное приобретение, передача, сбыт, хранение, перевозка, ношение или использование любых видов оружия, боеприпасов, специальных средств принадлежащих государственным структурам', priority: 4 },
  { number: '12.10', title: 'Хищение огнестрельного оружия, комплектующих деталей к нему, спец средств, боеприпасов, взрывчатых веществ или взрывных устройств', priority: 4 },
  { number: '13.1', title: 'Незаконные хранение, приобретение, перевозка и сбор наркотических веществ в значительном размере (свыше 3 грамм)', priority: 1 },
  { number: '13.2', title: 'Незаконные хранение, приобретение, перевозка и сбор наркотических средств в крупном размере (свыше 8 грамм)', priority: 3 },
  { number: '13.3', title: 'Незаконные хранение, приобретение, перевозка и сбор наркотических средств в особо крупном размере (свыше 20 грамм)', priority: 5 },
  { number: '13.4', title: 'Незаконное кустарное производство наркотических веществ в любых размерах', priority: 3 },
  { number: '15.1', title: 'Превышение должностных полномочий, то есть совершение должностным лицом действий, явно выходящих за пределы его полномочий и повлекших существенное нарушение прав и законных интересов граждан или организаций', priority: 4 },
  { number: '15.4', title: 'Получение взятки, то есть получение должностным лицом', priority: 4 },
  { number: '15.5', title: 'Дача взятки должностному лицу, лично или через посредника', priority: 3 },
  { number: '15.6', title: 'Халатность, то есть неисполнение или ненадлежащее исполнение должностным лицом своих обязанностей вследствие недобросовестного или небрежного отношения к службе либо обязанностей по должности, если это деяние повлекло существенное нарушение прав и законных интересов граждан, организаций и государства', priority: 4 },
  { number: '15.8', title: 'Провокация, равно как помеха исполнению обязанностей гос. служащих', priority: 2 },
  { number: '16.13', title: 'Дача заведомо ложных показаний и сведений адвокату или прокурору', priority: 4 },
  { number: '16.15', title: 'Уклонение от отбывания реального срока', priority: 3 },
  { number: '17.1', title: 'Посягательство на жизнь сотрудника правоохранительного органа', priority: 5 },
  { number: '17.3', title: 'Оскорбление представителя власти при исполнении', priority: 2 },
  { number: '17.6', title: 'Неподчинение законным требованиям сотрудника', priority: 3 },
  { number: '17.7', title: 'Отказ от оплаты штрафа', priority: 2 },
  { number: '17.13', title: 'Побег при задержании, равно как уклонение от правосудия', priority: 5 }
];

const Index = () => {
  const [search, setSearch] = useState('');
  const [selectedPriority, setSelectedPriority] = useState<number | null>(null);

  const filteredArticles = articles.filter(article => {
    const matchesSearch = article.number.toLowerCase().includes(search.toLowerCase()) ||
                         article.title.toLowerCase().includes(search.toLowerCase());
    const matchesPriority = selectedPriority === null || article.priority === selectedPriority;
    return matchesSearch && matchesPriority;
  });

  const renderStars = (priority: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map(star => (
          <Icon
            key={star}
            name={star <= priority ? 'Star' : 'Star'}
            size={16}
            className={star <= priority ? 'fill-amber-400 text-amber-400' : 'text-muted'}
          />
        ))}
      </div>
    );
  };

  const getPriorityColor = (priority: number) => {
    const colors = {
      1: 'bg-green-500/20 text-green-300 border-green-500/50',
      2: 'bg-blue-500/20 text-blue-300 border-blue-500/50',
      3: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50',
      4: 'bg-orange-500/20 text-orange-300 border-orange-500/50',
      5: 'bg-red-500/20 text-red-300 border-red-500/50'
    };
    return colors[priority as keyof typeof colors] || colors[3];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-block mb-4 px-6 py-2 bg-gradient-to-r from-primary to-secondary rounded-full">
            <span className="text-sm font-semibold tracking-wider">MAJESTIC RP</span>
          </div>
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Уголовный Кодекс
          </h1>
          <p className="text-muted-foreground text-lg mb-2">Справочник статей и приоритетов розыска</p>
          <p className="text-sm text-muted-foreground/70">by Boba Migalkin</p>
        </div>

        <div className="mb-8 space-y-4 animate-scale-in">
          <div className="relative">
            <Icon name="Search" className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
            <Input
              placeholder="Поиск по номеру или тексту статьи..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-12 h-14 text-lg bg-card border-border/50 focus:border-primary transition-all"
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSelectedPriority(null)}
              className={`px-4 py-2 rounded-lg font-medium transition-all hover:scale-105 ${
                selectedPriority === null
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-foreground border border-border/50'
              }`}
            >
              Все приоритеты
            </button>
            {[1, 2, 3, 4, 5].map(priority => (
              <button
                key={priority}
                onClick={() => setSelectedPriority(priority)}
                className={`px-4 py-2 rounded-lg font-medium transition-all hover:scale-105 flex items-center gap-2 ${
                  selectedPriority === priority
                    ? getPriorityColor(priority).replace('/20', '/30')
                    : 'bg-card text-foreground border border-border/50'
                }`}
              >
                <Icon name="Star" size={16} className={selectedPriority === priority ? 'fill-current' : ''} />
                {priority}
              </button>
            ))}
          </div>
        </div>

        <div className="text-sm text-muted-foreground mb-4">
          Найдено статей: <span className="text-foreground font-semibold">{filteredArticles.length}</span>
        </div>

        <div className="grid gap-4 animate-fade-in">
          {filteredArticles.map((article, index) => (
            <Card
              key={article.number}
              className="p-6 bg-card border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-primary/10"
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold text-lg">
                    {article.number}
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold mb-3 text-foreground">
                    {article.title}
                  </h3>
                  
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Приоритет розыска:</span>
                      {renderStars(article.priority)}
                    </div>
                    
                    <Badge className={`${getPriorityColor(article.priority)} border`}>
                      Уровень {article.priority}
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredArticles.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <Icon name="SearchX" size={64} className="mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-2xl font-semibold mb-2">Ничего не найдено</h3>
            <p className="text-muted-foreground">Попробуйте изменить параметры поиска</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
