#include<iostream>
#include<stdlib.h>
#include<stdio.h>
using namespace std;



class bird
{
	public:
	int strat;
	int fit;
		
	bird( int y)
	{
		strat = 1;
		fit = y;	
	}
	void changefit(int c)
	{
		fit = fit + c;
	}
	void changestrat(int c)
	{
		strat = c;
	}
};
//computer's strategy rand(2)+1
int main()
{
	int ifit = 1000, rounds = 3;
	int i = 0;
	int strat1, strat2;
	int resource = 50, damage = 100;
	cout<<" You are a player fighting for a resource that has value V. \n A fight consists of 10 rounds. \n Each player can choose between 2 strategies for each round. \n Strategy 1 is to display and retreat if the opponent attacks. \n Strategy 2 is to attack till you are injured.\n Injury leads to a loss in points. \n";
	bird bird1(ifit), bird2(ifit);
		cout<<"Initial fitness\n";
		cout<<"Fitness of Player 1 "<<bird1.fit<<"\n";
		cout<<"Fitness of Player 2 "<<bird2.fit<<"\n";
		
	do{
		//system("cls");
		cout<<"Round "<<i+1<<"\n";
		cout<<"Player 1 choose strategy\n";
		cin>>strat1;
		cout<<"Player 2 has chosen a strategy\n";
		int strat2=rand()%2+1;
		//cin>>strat2;
		bird1.changestrat(strat1);
		bird2.changestrat(strat2);

		if(bird1.strat == 1 && bird2.strat == 1)
		{
			bird1.changefit(resource/2);
			bird2.changefit(resource/2);		
		}else
		if(bird1.strat == 1 && bird2.strat == 2)
		{
			bird2.changefit(resource);		
		}else
		if(bird1.strat == 2 && bird2.strat == 1)
		{
			bird1.changefit(resource);		
		}else
		if(bird1.strat == 2 && bird2.strat == 2)
		{
			bird1.changefit((resource-damage)/2);
			bird2.changefit((resource-damage)/2);		
		}
		i++;
		cout<<"Player 1 fitness "<<bird1.fit<<"\n";
		cout<<"Player 2 fitness "<<bird2.fit<<"\n";
	}while(i <=rounds);
	if (bird1.fit > bird2.fit)
	{
		cout<<"Player 1 wins";
	}else if (bird1.fit < bird2.fit)
	{
			cout<<"Player 2 wins";
	}else
	{
		cout<<"DRAW";
	}
}
